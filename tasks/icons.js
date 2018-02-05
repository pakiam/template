import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';

gulp.task('icons', () => (
	gulp.src('app/icons/**/*.svg')
		.pipe(plumber({errorHandler: errorHandler(`Error in 'icons' task`)}))
		.pipe(svgSprite({
			shape: {
				dimension: {
					maxHeight: 100,
					maxWidth: 100
				}
			},
			mode: {
				view: {
					dest: './',
					layout: 'diagonal',
					sprite: 'svg-sprite-styles',
					bust: false,
					render: {
						scss: {
							dest: '_sprite',
							template: 'app/icons/sprite-template.scss'
						}
					},
				},
				symbol: {
					dest: './',
					sprite: 'svg-sprite',
					bust: false
				},
			},
		}))
		.pipe(gulpIf(/\.scss$/, gulp.dest('app/styles/helpers')))
		// .pipe(gulpIf(/\.svg$/, rename('icon.svg')))
		.pipe(gulpIf(/\.svg$/, gulp.dest('dist/assets/images/')))
));
