/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useMemo, useRef, memo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  useScroll,
  ScrollControls,
  Environment,
  Merged,
  Text,
  MeshReflectorMaterial,
} from '@react-three/drei'

function Train(props) {
  const { cabins } = props
  const ref = useRef()
  const scroll = useScroll()
  const [cabin, seat] = useGLTF([
    '/static/cabin-transformed.glb',
    '/static/seat-transformed.glb',
  ])
  const meshes = useMemo(
    () => ({ Cabin: cabin.nodes.cabin_1, Seat: seat.nodes.seat }),
    [cabin, seat]
  )
  useFrame(() => (ref.current.position.z = scroll.offset * 120))
  // Merged creates THREE.InstancedMeshes out of the meshes you feed it
  // All in all we end up with just 5 draw-calls for the entire scene
  let getZ = (i) => {
    return -6 + (i * -26)
  }
  return (
    <Merged castShadow receiveShadow meshes={meshes}>
      {(models) => (
        <group ref={ref}>
          {cabins.map(({ _key, name }, i) => (
            <Cabin
              key={_key}
              models={models}
              color="#252525"
              seatColor="sandybrown"
              name={name}
              position={[0, 0, getZ(i)]}
            />
          ))}
          <Cabin
            models={models}
            color="#252525"
            seatColor="sandybrown"
            name="1A"
            position={[0, 0, getZ(cabins.length)]}
          />
          <Cabin
            models={models}
            color="#454545"
            seatColor="gray"
            name="2B"
            position={[0, 0, getZ(cabins.length + 1)]}
          />
          <Cabin
            models={models}
            color="#252525"
            seatColor="lightskyblue"
            name="3A"
            position={[0, 0, getZ(cabins.length + 2)]}
          />
          <Cabin
            models={models}
            color="#454545"
            seatColor="gray"
            name="4B"
            position={[0, 0, getZ(cabins.length + 3)]}
          />
          <Cabin
            models={models}
            color="#252525"
            seatColor="sandybrown"
            name="5B"
            position={[0, 0, getZ(cabins.length + 4)]}
          />
          
        </group>
      )}
    </Merged>
  )
}

const Quarter = ({ models, color, ...props }) => (
  <group {...props}>
    <models.Seat color={color} position={[-0.35, 0, 0.7]} />
    <models.Seat color={color} position={[0.35, 0, 0.7]} />
    <models.Seat
      color={color}
      position={[-0.35, 0, -0.7]}
      rotation={[0, Math.PI, 0]}
    />
    <models.Seat
      color={color}
      position={[0.35, 0, -0.7]}
      rotation={[0, Math.PI, 0]}
    />
  </group>
)

const Row = ({ models, color, ...props }) => (
  <group {...props}>
    <Quarter models={models} color={color} position={[-1.2, -0.45, 9.75]} />
    <Quarter models={models} color={color} position={[1.2, -0.45, 9.75]} />
  </group>
)

const Cabin = ({
  models,
  color = 'white',
  seatColor = 'white',
  name,
  ...props
}) => (
  <group {...props}>
    <Text
      fontSize={4}
      color="#101020"
      position={[0, 6, 4]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      {name}
    </Text>
    <models.Cabin color={color} />
    <Row models={models} color={seatColor} />
    <Row models={models} color={seatColor} position={[0, 0, -1.9]} />
    <Row models={models} color={seatColor} position={[0, 0, -6.6]} />
    <Row models={models} color={seatColor} position={[0, 0, -8.5]} />
    <Row models={models} color={seatColor} position={[0, 0, -11]} />
    <Row models={models} color={seatColor} position={[0, 0, -12.9]} />
    <Row models={models} color={seatColor} position={[0, 0, -17.6]} />
    <Row models={models} color={seatColor} position={[0, 0, -19.5]} />
  </group>
)

const CanvasMemo = memo(function TrainsCanvas(props) {
  console.debug('TrainsCanvas render', { props })

  const { environmentPreset, cabins } = props

  return (
    <Canvas
      dpr={[1, 1.5]}
      shadows
      camera={{ position: [-15, 15, 18], fov: 35 }}
      gl={{ alpha: false }}
    >
      <fog attach="fog" args={['#17171b', 30, 40]} />
      <color attach="background" args={['#17171b']} />
      <ambientLight intensity={0.25} />
      <directionalLight
        castShadow
        intensity={2}
        position={[10, 6, 6]}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          attach="shadow-camera"
          left={-20}
          right={20}
          top={20}
          bottom={-20}
        />
      </directionalLight>
      <Suspense fallback={null}>
        <ScrollControls pages={4}>
          <Train cabins={cabins} />
        </ScrollControls>
        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#151515"
            metalness={0.6}
            roughness={1}
          />
        </mesh>
        <Environment preset={environmentPreset} />
      </Suspense>
    </Canvas>
  )
})

export default function TrainsPreview(props) {
  console.info('TrainsPreview displayed', props.document.displayed)
  console.debug('TrainsPreview props', props)

  useEffect(() => {
    document.documentElement.style.overscrollBehavior = 'none'
    document.body.style.overscrollBehavior = 'none'
    return () => {
      delete document.documentElement.style.overscrollBehavior
      delete document.body.style.overscrollBehavior
    }
  }, [])

  const { environmentPreset, cabins } = props.document.displayed
  const memoCabins = useStableMemo(cabins || [])
  return (
    <CanvasMemo
      environmentPreset={environmentPreset || 'dawn'}
      cabins={memoCabins}
    />
  )
}

function useStableMemo(val) {
  const stringiedVal = useMemo(() => JSON.stringify(val), [val])
  return useMemo(() => JSON.parse(stringiedVal), [stringiedVal])
}
