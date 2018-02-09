import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import nano from 'gulp-cssnano';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import errorHandler from 'gulp-plumber-error-handler';
import sassGlob from 'gulp-sass-glob';

const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('styles', () => (
	gulp.src('app/styles/*.scss')
		.pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
		.pipe(gulpIf(isDebug, sourcemaps.init()))
		.pipe(sassGlob())
		.pipe(sass({
			use: [
				autoprefixer()
			],
			includePaths: ['node_modules/'],
			outputStyle: 'compressed',
			'include css': true
		}))
		.pipe(gulpIf(!isDebug, gcmq()))
		.pipe(gulpIf(!isDebug, nano({zindex: false})))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulpIf(isDebug, sourcemaps.write()))
		.pipe(gulp.dest('dist/assets/styles'))
));
