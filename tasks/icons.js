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
			mode: {
				sprite: {
					dest: './',
					layout: 'diagonal',
					sprite: 'default-svg',
					bust: false,
					render: {
						scss: {
							template: 'app/icons/sprite-template.scss'
						}
					}
				},
				symbol: true,		// Activate the «symbol» mode
				variables: {
					mapname: 'icons'
				},
				svgId: "icon_%f"
			}
		}))
		.pipe(gulpIf(/\.scss$/, gulp.dest('app/styles/helpers')))
		.pipe(gulpIf(/\.svg$/, rename('icon.svg')))
		.pipe(gulpIf(/\.svg$/, gulp.dest('dist/assets/images/')))
));
