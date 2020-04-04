var plt = Bokeh.Plotting;

var pie_data = {
    labels: ['Work', 'Eat', 'Commute', 'Sport', 'Watch TV', 'Sleep'],
    values: [8, 2, 2, 4, 0, 8],
};

var p1 = Bokeh.Charts.pie(pie_data);
var p2 = Bokeh.Charts.pie(pie_data, {
    inner_radius: 0.2,
    start_angle: Math.PI / 2
});
var p3 = Bokeh.Charts.pie(pie_data, {
    inner_radius: 0.2,
    start_angle: Math.PI / 6,
    end_angle: 5 * Math.PI / 6
});
var p4 = Bokeh.Charts.pie(pie_data, {
    inner_radius: 0.2,
    palette: "Oranges9",
    slice_labels: "percentages"
});

// add the plot to a document and display it
var doc = new Bokeh.Document();
doc.add_root(plt.gridplot(
                 [[p1, p2], [p3, p4]],
                 {plot_width:250, plot_height:250}));
Bokeh.embed.add_document_standalone(doc, document.currentScript.parentElement);
