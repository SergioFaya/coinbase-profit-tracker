# coinbase-profit

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### Prerequisites
nvm -> node version manager

install node and npm

npm i -g @vue/cli
npm install -g vue-generate-component
## To generate single file components
vgc -s componentname
## Add bootstrap
https://bootstrap-vue.org/docs
vue add bootstrap-vue
* In main.js we add

```{js}
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
```
## Internationalization
vue add i18n

## Error chokify num watches in files
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
and
$ sudo sysctl -p
