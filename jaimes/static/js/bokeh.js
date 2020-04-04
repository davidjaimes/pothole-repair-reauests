var plt = Bokeh.Plotting;

var pie_data = {
  labels: ['Mobile', 'Web', 'Phone', 'Email'],
  values: [38586, 22592, 6378, 324],
  layout: {title: 'Pie Chart'}
};

var pie_chart = Bokeh.Charts.pie(pie_data);

// make a plot with some tools
var plot = Bokeh.Plotting.figure({
    title:'Example of Random data',
    tools: "pan,wheel_zoom,box_zoom,reset,save",
    height: 500,
    width: 500,
    background_fill_color: "#F2F2F7"
});

plt.show(plot);

plot.legend.location = "top_left"
plt.show(plt.gridplot([[pie_chart]], {
  plot_width:350,
  plot_height:350,
  toolbar_location: 'right',
  toolbar_options: {logo: 'gray'}
}));

Bokeh.Charts.show(pie_chart);
