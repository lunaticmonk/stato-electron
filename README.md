# Stato

<p align="center">
 <img src="./static/256x256.png" width="128px">
</p>

<h1 align="center">
	❯❯❯ Stato
</h1>

<p align="center">
Simply work.
</p>

<p align="center">
<img src="https://forthebadge.com/images/badges/made-with-javascript.svg">
<img src="https://forthebadge.com/images/badges/built-with-love.svg">
</p>

Stato is a minimal tool to increase your productivity and work without getting disturbed in offices or even in remote teams.

- Don't let anyone disturb you when you ACTUALLY work.
- Track how long one has been working or is offline and few other statuses.
- Manage your statuses for multiple organizations.

# Inspiration

Many a times it happens that employees in teams working together may stuck on something which they want to ask to the team member or get some opinions on certain feature requests. Some employees want to focus crucially while working and don't want to get disturbed. Thus, this tool will be helpful to them without getting disturbed by other employees during their peek work time. Also, it is possible for everybody in an organization to see how much time is a certain person working on certain feature.

Also, I wanted to try out [Electron](https://electronjs.org).

### Tech

Stato uses a number of open source projects to work properly:

- [Electron](https://electronjs.org/) - Framework to build cross platform native apps using HTML, CSS, JavaScript.
- [Vue](https://vuejs.org/) - Front-end JavaScript framework
- [Webpack](https://webpack.js.org/) - For bundling assets
- [Semantic UI](https://semantic-ui.com/) - UI Framework

### Demo

See demo [here](https://lunaticmonk.github.io/stato)

### API

Stato is served by the [stato-api](https://github.com/lunaticmonk/stato-api).

### Installation

For a ready build, head over to the releases of this GitHub repository.

Stato requires [Node.js](https://nodejs.org/) v8+ to run.

### Development

Want to contribute? Great!

```sh
$ git clone git@github.com:lunaticmonk/stato-electron.git
$ cd stato-electron
$ npm install
$ npm run dev
```

Create a file .env in the project root.
Add the following environment variables to it.

```sh
$ API_BASE=URL_AT_WHICH_STATO_API_IS_RUNNING
$ NODE_ENV=DEVELOPMENT_OR_PRODUCTION
```

#### Building binary

For production release:
Set the NODE_ENV=`production` in .env.

```sh
$ npm run build
```

The built binary will be in the build folder.

### Todos

- Add email verification for user
- Suggest more features
- Write Tests
- Add night mode

Please ⭐ this repository if you liked it.

## License

MIT
