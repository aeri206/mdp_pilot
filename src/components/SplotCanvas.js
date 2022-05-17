import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SplotCanvas = (props) => {

	const { ld, label, isLabel } = props;
	const canvasRef = useRef(null);


console.log(isLabel)
	useEffect(() => {
		// draw a scatterplot in the canvas (canvasRef)
		// first scale down the data (x, y) using scaleLinear
		// if props.isLabel is true, depict a label as a color
		// otherwise, draw a monochrome scatterplot
		function drawScatterplot() {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			ctx.fillStyle = 'white';
			const width = canvas.width;
			const height = canvas.height;
			ctx.fillRect(0, 0, width, height);

			const xScale = d3.scaleLinear().range([0, width]).domain(d3.extent(ld, d => d[0]));
			const yScale = d3.scaleLinear().range([height, 0]).domain(d3.extent(ld, d => d[1]));
			const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
			ctx.globalAlpha = 0.6;
			ld.forEach((datum, i) => {
				ctx.beginPath();
				ctx.arc(xScale(datum[0]), yScale(datum[1]), props.radius, 0, 2 * Math.PI);
				// change : always label
				if (isLabel) {
					ctx.fillStyle = colorScale(label[i]);
				} else {
					ctx.fillStyle = colorScale(label[0]);
				}
				ctx.fill();
				ctx.closePath();
			});
			ctx.globalAlpha = 1.0
		}

		drawScatterplot();
	}, [isLabel, label, ld, props.radius]);

	return (
			<canvas
				id={`${props.dataName}_${props.projectionIdx}`}
				width={props.size * 2}
				height={props.size * 2}
				ref={canvasRef}
				style={{
					margin: "10px 0 0 10px",
					alignSelf: "center", 
					border: "1px solid black",
					width: props.size,
					height: props.size
				}}
			>
			</canvas>
	)
};


export default SplotCanvas;