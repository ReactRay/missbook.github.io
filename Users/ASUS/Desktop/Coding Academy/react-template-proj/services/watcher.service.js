import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const WATCHER_KEY = 'watcherDB'
const DEFAULT_DATA = [
    { id: 'w101', fullname : 'Puki Ba', movies: ['Rambo', 'Rocky'], src: `/assets/img/user-imgs/user${utilService.getRandomInt(1, 3)}.png` },
    { id: 'w102', fullname : 'Muki Da', movies: ['Click', 'Up'], src: `/assets/img/user-imgs/user${utilService.getRandomInt(1, 3)}.png` },
    { id: 'w103', fullname : 'Shuki  Sa', movies: ['Cars', 'The Founder'], src: `/assets/img/user-imgs/user${utilService.getRandomInt(1, 3)}.png` },
];

_createWatchers()

export const watcherService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
}

// For Debug (easy access from console):
// window.cs = carService

function query(filterBy = {}) {
    return storageService.query(WATCHER_KEY)
        .then(watchers => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                watchers = watchers.filter(watcher => regExp.test(watcher.fullname))
            }

            return watchers
        })
}

function get(watcherId) {
    return storageService.get(WATCHER_KEY, watcherId)
}

function remove(watcherId) {
    return storageService.remove(WATCHER_KEY, watcherId)
}

function save(watcher) {
    if (watcher.id) {
        return storageService.put(WATCHER_KEY, watcher)
    } else {
        return storageService.post(WATCHER_KEY, watcher)
    }
}

function getDefaultFilter(filterBy = { txt: '',  }) {
    return { txt: filterBy.txt }
}

function _createWatchers() {
    let watchers = utilService.loadFromStorage(WATCHER_KEY)
    if (!watchers || !watchers.length) {
        utilService.saveToStorage(WATCHER_KEY, DEFAULT_DATA);
    }
}
