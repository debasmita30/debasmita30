const fs = require('fs');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { createSVGWindow } = require('svgdom');

const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);

const draw = SVG(document.documentElement);

// Read generated contribution dots
const inputSVG = fs.readFileSync('temp/contrib.svg', 'utf8');
draw.svg(inputSVG);

const dots = draw.find('rect'); // Each contribution cell

dots.each((i, dot) => {
  const x = parseFloat(dot.attr('x'));
  const y = parseFloat(dot.attr('y'));

  // Determine flower color based on contribution intensity
  const intensity = parseInt(dot.attr('fill').replace('#',''),16) % 3;
  const colors = ['#F25F92','#FFB6C1','#FF69B4']; // shades of pink
  const color = colors[intensity];

  // Replace dot with stem
  dot.attr({fill: '#16a34a', width: 4, height: 0, y: 200});

  // Add flower
  draw.circle(8)
      .cx(x + 5)
      .cy(200)
      .fill(color)
      .animate(1000 + Math.random()*1000, '<>')
      .attr({cy: 200 - (Math.random()*60+40), r: 8 + Math.random()*4});
});

// Save final SVG
fs.mkdirSync('output', { recursive: true });
fs.writeFileSync('output/contribution-garden.svg', draw.svg());
