(function () {
	drawGrid();
	drawResolutions();
})();

function drawGrid() {
	const gridSize = 40;
	const grid = document.querySelector('#grid g');

	function repeatFn(times, fn) {
		[...'*'.repeat(times)].forEach(fn);
	}

	function drawLine(x1, y1, x2, y2, dash) {
		return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-dasharray="4,${
			dash * 4
		}"></line>`;
	}

	repeatFn(16 * 2, (_, index) => {
		const vert = gridSize * index;

		grid.innerHTML += drawLine(vert, 0, vert, 800, index % 2);
	});

	repeatFn(10 * 2, (_, index) => {
		const horiz = gridSize * index;

		grid.innerHTML += drawLine(0, horiz, 1280, horiz, index % 2);
	});
}

function drawResolutions() {
	const resolutionRatios = document.querySelector('#resolution .ratios');
	const resolutionLabels = document.querySelector('#resolution .labels');
	const resolutionRectangles = document.querySelector(
		'#resolution .rectangles'
	);

	const resolution = [
		{ width: 640, height: 480, spec: 'VGA/SD 480p', xOffset: 0, yOffset: 50 },
		{ width: 800, height: 600, spec: 'SVGA', xOffset: 0, yOffset: 50 },
		{ width: 1024, height: 768, spec: 'XGA', xOffset: 0, yOffset: 50 },
		{ width: 1600, height: 1200, spec: 'UXGA', xOffset: 0, yOffset: 50 },
		{ width: 1280, height: 720, spec: 'HD 720p', xOffset: -20, yOffset: -20 },
		{
			width: 1920,
			height: 1080,
			spec: 'Full HD 1080p',
			xOffset: -20,
			yOffset: -20,
		},
		{
			width: 2560,
			height: 1440,
			spec: 'UHD 2K/QHD 1440p',
			xOffset: -20,
			yOffset: -20,
		},
		{ width: 3840, height: 2160, spec: 'UHD 4K', xOffset: -20, yOffset: -20 },
	];
	const ratioLines = [
		{ w: 3333, h: 2500, t: '4:3' },
		{ w: 4000, h: 2250, t: '16:9' },
	];

	ratioLines.forEach(
		r =>
			(resolutionRatios.innerHTML += `<line x1="0" y1="0" x2="${r.w}" y2="${
				r.h
			}" stroke-dasharray="8,8"></line>
<circle cx="${r.w}" cy="${r.h}" r="60"></circle>
<text x="${r.w}" y="${r.h + 20}">${r.t}</text>`)
	);

	resolution.forEach(
		res =>
			(resolutionRectangles.innerHTML += `<rect x="0" y="0" width="${res.width}" height="${res.height}"></rect>
	<circle cx="${res.width}" cy="${res.height}" r="10"></circle>`)
	);

	resolution.forEach(
		res =>
			(resolutionLabels.innerHTML += `<text x="${res.width + res.xOffset}" 
								y="${res.height + res.yOffset}">${res.spec} (${res.width}x${
				res.height
			})</text>`)
	);
}
