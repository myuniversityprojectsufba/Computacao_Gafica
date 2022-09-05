// Desenhando objetos gráficos 2D

import * as THREE from 'three';

import { GUI } from '../../Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js';

const 	gui 		= new GUI();
const 	rendSize 	= new THREE.Vector2();

var 	controls, 
		scene,
		camera,
		renderer,
		curObj = null;

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = 
	rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	window.addEventListener ( 'resize', onWindowResize 	);

	scene 	= new THREE.Scene();

	initGUI();

	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );

	const vertices = [];

	//Circulo
	for (var i=0;i<360;i++){
		var angle = i * (Math.PI/180);	
		vertices.push(	new THREE.Vector3( 0.5*Math.cos(angle), 0.5*Math.sin(angle), 0.0 ) );
	}

	var geometry = new THREE.BufferGeometry().setFromPoints( vertices );

	var lineStrip = new THREE.Line( geometry );
	lineStrip.name = "Circulo";
	lineStrip.visible = true;
	scene.add( lineStrip );

	curObj = scene.getObjectByName("Circulo").visible = true;
	console.log(curObj.name);
	curObj = lineStrip

	//Coracao
	const vertices2 = [];
	// for (var i=0;i<360;i++){
	// 	var angle = i * (Math.PI/180);	
	// 	vertices2.push(	new THREE.Vector3( 16*Math.pow(Math.sin(angle),3), 13*Math.cos(angle)−5*Math.cos(2*angle)−2*Math.cos(3*angle)−Math.cos(4*angle), 0.0 ) );
	// }

	geometry = new THREE.BufferGeometry().setFromPoints( vertices2 );
	
	lineStrip = new THREE.Line( geometry );
	lineStrip.name = "Coracao";
	lineStrip.visible = false;
	scene.add( lineStrip );	

	//Losango
	const vertices3 = [];
	for (var i=0;i<360;i++){
		var angle =(Math.PI/180) * i ;	
		vertices3.push(	new THREE.Vector3( 1*Math.pow(Math.sin(angle),3), 1*Math.pow(Math.cos(angle),3), 0.0 ) );
	}

	geometry = new THREE.BufferGeometry().setFromPoints( vertices3 );
	
	lineStrip = new THREE.Line( geometry );
	lineStrip.name = "Losango";
	lineStrip.visible = false;
	scene.add( lineStrip );

	//Pentagrama
	const vertices4 = [];
	// for (var i=0;i<360;i++){
	// 	var angle = i * (Math.PI/180);	
	// 	vertices4.push(	new THREE.Vector3( 1*Math.sin(angle), 1*Math.cos(angle), 0.0 ) );
	// }

	geometry = new THREE.BufferGeometry().setFromPoints( vertices4 );
	
	lineStrip = new THREE.Line( geometry );
	lineStrip.name = "Pentagrama";
	lineStrip.visible = false;
	scene.add( lineStrip );
	
	renderer.clear();
	renderer.render(scene, camera);
};

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function initGUI() {

	var controls = 	{	Atividade1 : "Circulo"
					};

	gui.add( controls, 'Formas 2D', [ 	"Circulo", 
										"Coracao", 
										"Losango",
										"Pentagrama" ] ).onChange(changeForm);
	gui.open();
};

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function changeLine(value) {
	scene.getObjectByName("linhaPoligonalAberta").visible 	= !value;

	renderer.clear();
	renderer.render(scene, camera);	
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function changeForm(val) { 
	console.log(val)
	switch (val) {
		case "Circulo"	: 		curObj = scene.getObjectByName("Circulo").visible = true;
								scene.getObjectByName("Coracao").visible 	= false;
								scene.getObjectByName("Losango").visible 	= false;
								scene.getObjectByName("Pentagrama").visible = false;
								break;
		case "Coracao"	:  		curObj = scene.getObjectByName("Coracao").visible= true;
								scene.getObjectByName("Circulo").visible 	= false;
								scene.getObjectByName("Losango").visible 	= false;
								scene.getObjectByName("Pentagrama").visible = false;
								break;
		case "Losango"	:  		curObj = scene.getObjectByName("Losango").visible= true;
								scene.getObjectByName("Coracao").visible 	= false;
								scene.getObjectByName("Circulo").visible 	= false;
								scene.getObjectByName("Pentagrama").visible = false;
								break;
		case "Pentagrama"	:  	curObj = scene.getObjectByName("Pentagrama").visible= true;
								scene.getObjectByName("Coracao").visible 	= false;
								scene.getObjectByName("Losango").visible 	= false;
								scene.getObjectByName("Circulo").visible = false;
								break;
		}

	renderer.clear();
	renderer.render(scene, camera);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function onWindowResize() {

	let minDim = Math.min(window.innerWidth, window.innerHeight);

	renderer.setSize(minDim*0.8, minDim*0.8);

	renderer.clear();
	renderer.render(scene, camera);
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //
main();
