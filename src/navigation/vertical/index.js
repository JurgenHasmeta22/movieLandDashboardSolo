// ** Icon imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MovieOutline from 'mdi-material-ui/MovieOutline'
import MoviePlay from 'mdi-material-ui/MoviePlayOutline'
import MoviePlus from 'mdi-material-ui/MoviePlusOutline'
import MovieSettings from 'mdi-material-ui/MovieSettingsOutline'

const navigation = () => {
  return [
    {
      title: 'List of Users',
      icon: AccountOutline,
      path: '/users'
    },
    {
      title: 'List of Movies',
      icon: MovieOutline,
      path: '/movies'
    },
    {
      title: 'List of Genres',
      icon: MoviePlay,
      path: '/genres'
    },
    {
      title: 'List of Series',
      icon: MoviePlus,
      path: '/series'
    },
    {
      title: 'List of Episodes',
      icon: MovieSettings,
      path: '/episodes'
    }
  ]
}

export default navigation
