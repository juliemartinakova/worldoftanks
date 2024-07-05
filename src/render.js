import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
//import { Sky } from 'three/addons/objects/Sky.js';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

//* classes

class Material {
    constructor(){}
    generate(type, color, roughness, metalness){
        let material
        switch(type){
            case "basic":
                material = new THREE.MeshBasicMaterial()
                break
            case "standard":
                material = new THREE.MeshStandardMaterial()
                break
            case "physical":
                material = new THREE.MeshPhysicalMaterial()
                break
            default:
                console.error(`No such material type as ${type} exists.`)
        }
        if (color){
            material.color = new THREE.Color(color)
        }
        if (roughness){
            material.roughness = roughness
        }
        if (metalness){
            material.roughness = roughness
        }
        return material
    }
}

class Geometry {
    constructor(){}
    box(w, h, d){
        let box = new THREE.BoxGeometry(w, h, d)
        return box
    }
    plane(w, h){
        let plane = new THREE.PlaneGeometry(w, h)
        return plane
    }
}

class Model {
    constructor(){}
    vehicle(mtlUrl, objUrl, scene){
        let objs = new OBJLoader()
        let mtls = new MTLLoader()
        mtls.setPath("models/")
        mtls.load(mtlUrl, mtl => {
            mtl.preload()
            objs.setMaterials(mtl)
            objs.setPath("models/")
            objs.load(objUrl, obj => {
                obj.traverse(child => {
                    if (child.material){
                        child.material.side = THREE.BackSide
                    }
                    objs.castShadow = true
                    objs.receiveShadow = true
                    scene.add(obj)
                })
            }, undefined, function(error){
                console.error(error)
            })
        }, undefined, function(error){
            console.error(error)
        })
    }
}

//* renderer

export const garageScene = new THREE.Scene()
export const garageCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const garageSceneRenderer = document.querySelector("#garage")
export let garageRenderer
let garageControls

//* garage scene controls

const setGarageRenderer = () => {
    garageRenderer = new THREE.WebGLRenderer({antialias: true, powerPreference: "high-performance"})
    garageRenderer.setAnimationLoop(refreshRender)
    garageRenderer.shadowMap.enabled = true
    garageRenderer.toneMapping = THREE.ACESFilmicToneMapping
    garageRenderer.toneMappingExposure = 1
    garageControls = new OrbitControls(garageCamera, garageRenderer.domElement)
    garageControls.enablePan = false
    garageControls.enableDamping = true
    garageControls.minDistance = 7
    garageControls.maxDistance = 10
    garageControls.zoomSpeed = 1.5
    garageControls.maxPolarAngle = (Math.PI / 2)-0.1
    garageControls.minPolarAngle = Math.PI / 4.5
    garageRenderer.setSize(window.innerWidth, window.innerHeight)
    garageRenderer.setClearColor(0x000000, 1)
    garageRenderer.setPixelRatio(window.devicePixelRatio)
    garageSceneRenderer.appendChild(garageRenderer.domElement)
    hangar.appendChild(garageSceneRenderer)
    window.addEventListener('resize', () => {
        garageCamera.aspect = window.innerWidth / window.innerHeight
        garageCamera.updateProjectionMatrix()
        garageRenderer.setSize(window.innerWidth, window.innerHeight)
    })
}

export const initializeRender = () => {
    setGarageRenderer()
}

//* threejs scene functions

garageScene.background = new THREE.CubeTextureLoader().setPath("skybox/").load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"])
garageScene.environment = new THREE.CubeTextureLoader().setPath("skybox/").load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"])

//* definition of scene objects

const material = new Material()
const geometry = new Geometry()

let plane = new THREE.Mesh(geometry.plane(100, 100), material.generate("standard", 0x2f4d13))
plane.receiveShadow = true

/*const mtl = new MTLLoader()
mtl.load("models/t-34-85.mtl", function(mtl){
    mtl.preload()
    const obj = new OBJLoader()
    obj.setMaterials(mtl)
    obj.load("models/T-34-85.obj", function(object){
        object.castShadow = true
        object.traverse(child => {
            if (child.material){
                child.material.side = THREE.BackSide
            }
        })
        garageScene.add(object)
    }, undefined, function(error){
        console.error(error)
    })
}, undefined, function(error){
	console.error(error)
})*/

const modelLoader = new Model()
let vehicle = modelLoader.vehicle("t-34-85.mtl", "T-34-85.obj", garageScene) 

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 1, 0)

plane.rotation.x = -Math.PI / 2

//* adding objects to a scene

garageScene.add(plane)
garageScene.add(directionalLight)

//* threejs renderer loop function

function refreshRender() {
    garageControls.update()
    garageRenderer.render(garageScene, garageCamera)
}