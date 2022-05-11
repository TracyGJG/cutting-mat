(function () {
	drawGrid();
	drawResolutions();
	drawStandardAngles();
})();

function drawGrid() {
	const gridSize = 40;
	const grid = document.querySelector('#grid g');

	function repeatFn(occurrence, fn) {
		[...'*'.repeat(occurrence)].forEach(fn);
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
	drawProjectionLines();
	drawScreenResultions();
}

function drawProjectionLines() {
	const resolutionRatios = document.querySelector('#resolution .ratios');

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
}

function drawScreenResultions() {
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

	drawScreenResultionsRectangles(resolution);
	drawScreenResultionsLabels(resolution);
}

function drawScreenResultionsRectangles(resolution) {
	const resolutionRectangles = document.querySelector(
		'#resolution .rectangles'
	);

	resolution.forEach(
		res =>
			(resolutionRectangles.innerHTML += `<rect x="0" y="0" width="${res.width}" height="${res.height}"></rect>
	<circle cx="${res.width}" cy="${res.height}" r="10"></circle>`)
	);
}

function drawScreenResultionsLabels(resolution) {
	const resolutionLabels = document.querySelector('#resolution .labels');

	resolution.forEach(
		res =>
			(resolutionLabels.innerHTML += `<text x="${res.width + res.xOffset}" 
								y="${res.height + res.yOffset}">${res.spec} (${res.width}x${
				res.height
			})</text>`)
	);
}

function drawStandardAngles() {
	const domAngles = document.querySelector('#angles g');
	const anglesDegs = [75, 60, 45, 30, 15];

	function createAngleSvg(deg, idx) {
		const MINOR_CIRCLE = 3;
		const MAJOR_CIRCLE = 20;
		const TEXT_OFFSET = 6;
		const CANVAS_WIDTH = 1280;
		const CANVAS_HEIGHT = 800;
		const ARC_INTERVAL = 160;

		const deg2Rad = ang => (ang * Math.PI) / 180;
		const sin = ang => Math.sin(deg2Rad(ang)).toFixed(2);

		const arcStartX = (idx + 1) * ARC_INTERVAL;
		const arcEndX = sin(90 - deg) * arcStartX;
		const arcEndY = CANVAS_HEIGHT - sin(deg) * arcStartX;

		const projectedX = CANVAS_HEIGHT * Math.tan(deg2Rad(90 - deg));
		const projectedY = CANVAS_WIDTH * Math.tan(deg2Rad(deg));
		const x = projectedY < CANVAS_HEIGHT ? CANVAS_WIDTH : projectedX;
		const y = projectedY < CANVAS_HEIGHT ? CANVAS_HEIGHT - projectedY : 0;

		return `
	<line x1="0" y1="${CANVAS_HEIGHT}" x2="${x}" y2="${y}"/>
	<circle cx="${x}" cy="${y}" r="${MAJOR_CIRCLE}"></circle>
	<text x="${x}" y="${y + TEXT_OFFSET}">${deg}°</text>
	<path d="M ${arcStartX} ${CANVAS_HEIGHT} A ${arcStartX} ${arcStartX} 0 0 0 ${arcEndX} ${arcEndY}"/>
	<circle cx="${arcEndX}" cy="${arcEndY}" r="${MINOR_CIRCLE}"></circle>
	<circle cx="${arcStartX}" cy="${CANVAS_HEIGHT}" r="${MAJOR_CIRCLE}"></circle>
	<text x="${arcStartX}" y="${CANVAS_HEIGHT + TEXT_OFFSET}">${sin(deg)}</text>
	`;
	}

	domAngles.innerHTML = anglesDegs.map(createAngleSvg).join('');
}
