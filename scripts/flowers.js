const fs = require('fs');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { createSVGWindow } = require('svgdom');

const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);

const inputSVG = fs.readFileSync('temp/contrib.svg', 'utf8');
const draw = SVG(document.documentElement);
draw.svg(inputSVG);

const dots = draw.find('rect'); // contribution dots
dots.each((i, dot) => {
  const x = dot.attr('x');
  const y = dot.attr('y');

  // Replace dot with flower stem
  dot.attr({fill: '#16a34a', width: 4, height: 0, y: 200});
  
  // Add flower circle
  draw.circle(8)
      .cx(parseFloat(x) + 5)
      .cy(200)
      .fill('#F25F92')
      .animate(1000, '<>')
      .attr({cy: 200 - Math.random() * 60, r: 8 + Math.random()*4});
});

fs.writeFileSync('output/contribution-garden.svg', draw.svg());
