import * as BABYLON from "babylonjs"
import "babylonjs-loaders";
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import HavokPhysics from "@babylonjs/havok";
import { loading_spinner_change, loading_spinner_reset, loading_spinner_init } from "../main/custom_elements";
import { settings_get } from "../main/game_settings";
import { enter_lobby } from "../main/element_query";

let graphics_settings = settings_get("graphics")

async function initHavok() {
    const plugin = await HavokPhysics();
    return plugin
}

async function initEngine(canvas) {
    let engine;
    const webGPUSupported = navigator.gpu

    if (webGPUSupported) {
        engine = new BABYLON.WebGPUEngine(canvas);
        console.log("Using WebGPU");
        await engine.initAsync();
    } else {
        engine = new BABYLON.Engine(canvas, true);
        console.log("Using WebGL");
    }

    return engine;
}

async function createScene(canvas) {

    const engine = await initEngine(canvas);
    const scene = new BABYLON.Scene(engine);
    let havokPlugin;

    if(window.location.origin == "http://localhost:1000"){
        havokPlugin = havokInstance
    } else {
        havokPlugin = await initHavok()
    }

    const hk = new BABYLON.HavokPlugin(true, havokPlugin)
    
    if (!havokPlugin) {
        console.error("Failed to initialize Havok plugin.");
        return;
    }

    await havokPlugin.ready;

    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), hk)
    scene.imageProcessingConfiguration.toneMappingEnabled = true;
    scene.imageProcessingConfiguration.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_KHR_PBR_NEUTRAL
    scene.collisionsEnabled = true;

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.applyGravity = true;
    camera.panningSensibility = 0;
    camera.checkCollisions = true;
    camera.ellipsoid = new BABYLON.Vector3(5, 5, 5);
    camera.lowerRadiusLimit = 15;
    camera.useBouncingBehavior = true;
    camera.useFramingBehavior = true;
    camera.upperRadiusLimit = 25;

    const light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(-5, -5, -5), scene);
    light.position = new BABYLON.Vector3(20, 60, -20);
    light.shadowMinZ = 0
    light.shadowMaxZ = 100
    light.intensity = 2

    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 20 }, scene);
    box.position.x = 15;
    box.position.z = 0;
    box.checkCollisions = true
    const boxAggregate = new BABYLON.PhysicsAggregate(box, BABYLON.PhysicsShapeType.BOX, { mass: 1 }, scene);

    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, scene);
    ground.checkCollisions = true
    const groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);

    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    scene.environmentTexture = new BABYLON.CubeTexture("assets/graphics/vehicles/glb_test/env_tex.env", scene);

    var default_pipeline = new BABYLON.DefaultRenderingPipeline("default_pipeline", true, scene, [camera]);
    default_pipeline.bloomEnabled = true;
    default_pipeline.bloomWeight = 0.0125;
    default_pipeline.imageProcessingEnabled = true;

    /*var motionblur = new BABYLON.MotionBlurPostProcess(
        "mb", // The name of the effect.
        scene, // The scene containing the objects to blur according to their velocity.
        1.0, // The required width/height ratio to downsize to before computing the render pass.
        camera // The camera to apply the render pass to.
    );*/

    const shadow_generator = new BABYLON.ShadowGenerator(1024, light)
    shadow_generator.useContactHardeningShadow = true;
	shadow_generator.contactHardeningLightSizeUVRatio = 0.05;
    shadow_generator.bias = 0.001
    shadow_generator.normalBias = 0.01

    shadow_generator.addShadowCaster(box)
    box.receiveShadows = true
    ground.receiveShadows = true

    /*const vehicle = await BABYLON.SceneLoader.ImportMesh("", "assets/graphics/vehicles/"+"sample_model/", "T-34-85.obj", scene, (meshes)=>{
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
            shadow_generator.addShadowCaster(mesh)
            mesh.receiveShadows = true
            mesh.material.backFaceCulling = false
            mesh.material.emissiveColor = new BABYLON.Color3(1, 1, 1)
            mesh.castShadow = true
            mesh.useSelfShadow = true
            mesh.material.forceDepthWrite = true;
            mesh.checkCollisions = true
            const meshAggregate = new BABYLON.PhysicsAggregate(mesh, BABYLON.PhysicsShapeType.MESH, { mass: 0 }, scene);
        })
    })*/

    let vehicle_root = new BABYLON.Mesh("vehicle_root", scene);
    vehicle_root.checkCollisions = true
    /*BABYLON.SceneLoader.ImportMesh("", "assets/graphics/vehicles/glb_test/", "R07_T-34-85.glb", scene, (meshes) => {
        vehicleMeshes = meshes; // Store the loaded vehicle meshes
        meshes.forEach(mesh => {
            shadow_generator.addShadowCaster(mesh);
            mesh.receiveShadows = true;
            //mesh.material.backFaceCulling = false;
            //mesh.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
            mesh.castShadow = true;
            mesh.useSelfShadow = true;
            //mesh.material.forceDepthWrite = true;
            mesh.checkCollisions = true;
            const meshAggregate = new BABYLON.PhysicsAggregate(mesh, BABYLON.PhysicsShapeType.MESH, { mass: 0 }, scene);
            console.log(mesh)
        });
    });*/

    BABYLON.SceneLoader.ImportMesh("", "assets/graphics/vehicles/glb_test/", "MT.glb", scene, (meshes) => {
        console.log(meshes)
        let i = 0
        meshes[0].optimizeIndices(function(){
            meshes[0].simplify(
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
        meshes.forEach(node => {
            node.parent = vehicle_root;
            if(node.material){
                shadow_generator.addShadowCaster(node)
                node.receiveShadows = true
                node.castShadow = true
                node.useSelfShadow = true
                node.material.metallic = 0
                node.material.metallicF0Factor = 0.5
                node.material.environmentIntensity = 1
                node.material.ambientTextureStrength = 0
                console.log("name", node.name)
                node.checkCollisions = true
                
                const node_aggregate = new BABYLON.PhysicsAggregate(node, BABYLON.PhysicsShapeType.MESH, { mass: 0 }, scene);
            }
        })
        const vehicle_aggregate = new BABYLON.PhysicsAggregate(vehicle_root, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);
        //const vehicle_aggregate = new BABYLON.PhysicsAggregate(meshes[0], BABYLON.PhysicsShapeType.MESH, { mass: 15 }, scene);
    });

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener("resize", () => {
        engine.resize();
    });
    
    scene.debugLayer.show()

    return scene;
}

const canvas = document.querySelector(".lobby_renderer");

if(!window.location.search.match("no_renderer")){
    enter_lobby.addEventListener("click", ()=>createScene(canvas))
}