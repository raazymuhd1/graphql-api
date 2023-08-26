import { userLists, movieLists } from "../fake-data.js"

const resolvers = {
    Query: {
        users() {
            console.log(userLists)
            return userLists
        },
        user(parent, args) {
            const user = userLists.filter(user => user.id == args.id)
            console.log(user)
            return user[0];
        },
        movies() {
            return movieLists
        },
        movie(parent, args) {
            const singleMovie = movieLists.filter(movie => movie.title == args.name)
            return singleMovie; 
        }
    },
   User: {
      favoriteMovies: () => {
          const returnedMovies = movieLists.filter(movie => movie.yearRelease >= "2020")
          return returnedMovies
      }
   },
   Mutation: {
     createUser(parent, args) {
        const newUser = args.user;
        const lastId = userLists[userLists.length-1].id;
        console.log(newUser)
        newUser.id = lastId + 1
         userLists.push({ ...newUser });
          return newUser;
     },
     updateUser(_, args) {
         const { id, user } = args
         const filteredUser = userLists.filter(user => user.id === id)
         let updatedUser = filteredUser[0]
         updatedUser = { id: updatedUser.id, job: updatedUser.job, address: updatedUser.address, isMarried: updatedUser.isMarried, ...user }
         
         console.log(updatedUser)
         return updatedUser
     }
   }

}

export default resolvers