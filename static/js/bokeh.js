var plt = Bokeh.Plotting;

var pie_data = {
  labels: ['Mobile', 'Web', 'Phone', 'Email'],
  values: [38586, 22592, 6378, 324],
  layout: {title: 'Pie Chart'}
};

var pie_chart = Bokeh.Charts.pie(pie_data, {
  width: 500,
  height: 500,
  slice_labels: 'labels',
  inner_radius: 0,
  outer_radius: 1,
  start_angle: Math.PI / 2
});

plt.show(plt.gridplot([[pie_chart]], {
  toolbar_location: 'right',
}));
