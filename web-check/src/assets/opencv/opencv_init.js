var Module =  {
	wasmBinaryFile: 'wasm/opencv_js.wasm',
	usingWasm: true,
	onRuntimeInitialized: () => { console.log('OpenCV is ready)}
}