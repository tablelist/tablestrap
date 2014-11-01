default:
	bower install
	lessc src/tablestrap.less > dist/tablestrap.css
	lessc -x src/tablestrap.less > dist/tablestrap.min.css

clean:
	rm -rf ./dist/*
	rm -rf ./src/bower_components

css:
	lessc src/tablestrap.less > dist/tablestrap.css

minify:
	lessc -x src/tablestrap.less > dist/tablestrap.min.css
