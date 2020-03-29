const getScrollbarSize = () => {
	const { body } = document;
	const scrollDiv = document.createElement('div');

	scrollDiv.setAttribute('style', 'width: 1337px; height: 1337px; position: absolute; left: -9999px; overflow: scroll;')
	body.appendChild(scrollDiv);

	const calculateValue = (type) => scrollDiv[`offset${type}`] - scrollDiv[`client${type}`];
	const scrollbarWidth = calculateValue('Width');

	body.removeChild(scrollDiv);

	return scrollbarWidth;
};

export default getScrollbarSize;
