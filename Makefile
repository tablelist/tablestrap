default:
	bower install
	lessc src/main.less > dist/tablestrap.css
	lessc -x src/main.less > dist/tablestrap.min.css

clean:
	rm -rf ./dist/*
	rm -rf ./src/bower_components

css:
	lessc src/main.less > dist/tablestrap.css

minify:
	lessc -x src/main.less > dist/tablestrap.min.css
