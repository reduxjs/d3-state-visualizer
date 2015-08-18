import isArray from 'lodash/lang/isArray';

export default function() {
  return function graphChart(d3, DOMNode, props) {
    const { data, id, size, aspectRatio, charge, linkDistance, maxNodeSize } = props;
    const margin = {
      top: size / 100,
      right: size / 50,
      bottom: size / 100,
      left: 40
    };
    const width = size - margin.left - margin.right;
    const height = size * aspectRatio - margin.top - margin.bottom;
    const fullWidth = size;
    const fullHeight = size * aspectRatio;

    const root = d3.select(DOMNode);
    const vis = root.append('svg')
      .attr('id', id)
      .attr('preserveAspectRatio', 'xMinYMin slice')
      .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    let node = vis.selectAll('circle');

    const force = d3.layout.force()
      .size([width, height])
      .nodes(data)
      .linkDistance(linkDistance)
      .charge(charge)
      .on('tick', function tick() {
        node.attr({
          cx: d => Math.round(d.x),
          cy: d => Math.round(d.y)
        });
      });

    let nodes = force.nodes();

    return function renderChart(nextNodes) {
      if (nextNodes) {
        nodes = [...nodes, ...nextNodes];
        force.nodes(nodes);
      }

      node = node.data(nodes);
      node.enter()
        .insert('circle')
        .attr({
          r: d => {
            const datum = d[d.key];
            if (!isArray(datum)) return 10;
            const radius = 10 + 2 * d[d.key].length;
            return radius > maxNodeSize ? 10 : radius;
          },
          fill: d => isArray(d[d.key]) ? 'blue' : 'red'
        })
        .on({
          mouseover: function nodeMouseover() {
            d3.select(this).style('fill-opacity', '0.5');
          },
          mouseout: function nodeMouseout() {
            d3.select(this).style('fill-opacity', '1');
          }
        })
        .call(force.drag);
      node.exit().remove();

      force.start();
    };
  };
}
