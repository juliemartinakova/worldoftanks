import * as BABYLON from "babylonjs"
import "babylonjs-loaders";

const canvas = document.getElementById("hangarSceneRenderer")
const engine = new BABYLON.Engine(canvas)
export let shadowGenerator

export class VehicleLoader {
    constructor(scene, shadowGenerator){
        this.scene = scene;
        this.shadowGenerator = shadowGenerator;
        this.currentVehicle = null;
    }
    async loadVehicle(tankName, path){
        if (this.currentVehicle){
            this.scene.removeMesh(this.currentVehicle);
            this.currentVehicle = null
        }
        BABYLON.SceneLoader.ImportMesh("", "assets/graphics/vehicles/"+tankName, path, this.scene, (meshes)=>{
            const vehicle = meshes
            console.log(vehicle)
            vehicle[0].optimizeIndices(function(){
                vehicle[0].simplify(
                    [
                        {distance:25, quality:0.8}, 
                        {distance:30, quality:0.5}, 
                        {distance:40, quality:0.3}, 
                        {distance:50, quality:0.1}
                    ],
                    false,
                    BABYLON.SimplificationType.QUADRATIC
                )
            })
            vehicle.forEach(mesh => {
                this.shadowGenerator.addShadowCaster(mesh)
                mesh.receiveShadows = true
                mesh.material.backFaceCulling = false
                mesh.material.emissiveColor = new BABYLON.Color3(1, 1, 1)
                mesh.castShadow = true
                mesh.useSelfShadow = true
                mesh.material.forceDepthWrite = true;
            })
            this.currentVehicle = vehicle
        })
    }
}   

export const createScene = async function() {

    const scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    scene.imageProcessingConfiguration.toneMappingEnabled = true;
    scene.imageProcessingConfiguration.toneMappingEnabled = BABYLON.ImageProcessingConfiguration.TONEMAPPING_KHR_PBR_NEUTRAL

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI/2, Math.PI/2.5, 25, new BABYLON.Vector3(0,0,0), scene)
    camera.attachControl(canvas, true)
    camera.upperBetaLimit = Math.PI/2.15
    camera.useBouncingBehavior = true
    camera.useAutoRotationBehavior = true

    var defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", true, scene, [camera]);
    defaultPipeline.bloomEnabled = true;
    defaultPipeline.bloomWeight = 0.5;
    
    const light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(-10, -12, -15), scene)
    light.shadowMaxZ = 150;
	light.shadowMinZ = 5;
    light.intensity = 1

    shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_LOW;
    shadowGenerator.setDarkness(0.4);
    shadowGenerator.setTransparencyShadow(true);
    shadowGenerator.bias = 0.00001
    shadowGenerator.usePoissonSampling = true
    shadowGenerator.normalBias = 0.05
    
    const plane = BABYLON.MeshBuilder.CreateGround("ground", {width:256,height:256}, scene)
    const plane_mat = new BABYLON.StandardMaterial("plane_mat", scene)
    plane_mat.diffuseColor = new BABYLON.Color3(0,1,0)
    plane.checkCollisions = true

    plane.material = plane_mat
    plane.receiveShadows = true

    const vehicleLoader = new VehicleLoader(scene, shadowGenerator)

    const devbypassHangar = document.querySelector(".devbypass-hangar")

    devbypassHangar.addEventListener("click", ()=>{
        setTimeout(()=>{
            vehicleLoader.loadVehicle("sample_model/", "T-34-85.obj")
        },12800)
    })

    return scene
}

export const scene = createScene()

createScene().then((scene) => {
    engine.runRenderLoop(function () {
        if (scene) {
            scene.render();
        }
    });
});

window.addEventListener("resize", function () {
    engine.resize()
})