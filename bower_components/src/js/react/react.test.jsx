var style = {
	'border' : '1px solid #000',
	'color' : 'red',
	'background' : 'yellow'
}
var count = 0;
var HelloWorld = React.createClass({
	componentWillReceiveProps: function() {

	},
	shouldConponentUpdate: function() {
		return true;
	},
	componentWillUpdate: function() {

	},
	render: function() {
		return (
			<p ref="childp">Hello, { this.props.name || "world!" }<br />{ ""+this.state.ready }{ this.state.myCount }</p>
		);
	},
	componentDidMount: function() {
		console.log(5);
		$(ReactDOM.findDOMNode(this)).append("<br />surprise!")
	}
});

ReactDOM.render( <div style={ style }><HelloWorld/><HelloWorld/></div>, document.getElementById('app'));