default:
	npm install
	bower install

clean:
	rm -rf ./build
	rm -rf ./src/bower_components

css:
	lessc src/main.less > build/tablestrap.css

minify:
	lessc -x src/main.less > build/tablestrap.css
