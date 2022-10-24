const baseURL = 'http://localhost:3333/'
let token = ''


export async function login(data) {
  try {
   const option = {
      'method': 'POST',
      'headers': {
         'Content-Type': 'application/json',
      },
      'body': JSON.stringify(data)
   }

   const responseJSON = await fetch(`${baseURL}login`, option)

   const response = await responseJSON.json()

   token = JSON.stringify(response.token) 

   if(token !== undefined) {
      localStorage.setItem('userToken', token)
   }

   return response

  } catch(err) {
   console.log(err)
  }
}

export async function create(data) {
   try {
      const option = {
         'method': 'POST',
         'headers': {
            'Content-Type': 'application/json',
         },
         'body': JSON.stringify(data)
      }
   
      const responseJSON = await fetch(`${baseURL}users/create`, option)
   
      const response = await responseJSON.json()
   
      return response

   } catch (err) {
      console.log(err)
   }
}

export async function getUser(token) {
  try {
   const option = {
      'method': 'GET',
      'headers': {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
      }
   }

   const responseJSON = await fetch(`${baseURL}users/profile`, option)

   const response = await responseJSON.json()

   return response

  } catch(err) {
   console.log(err)
  }
}

export async function insertPost(data, token) {
   try {
      const option = {
         'method': 'POST',
         'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify(data)
      }
   
      const responseJSON = await fetch(`${baseURL}posts/create`, option)
      const response = await responseJSON.json()
   
      return response

   } catch(err) {
      console.log(err)
   }
}

export async function getPosts(token) {
  try {
   const option = {
      'method': 'GET',
      'headers': {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
      }
   }

   const responseJSON = await fetch(`${baseURL}posts`, option)

   const response = await responseJSON.json()

   return response

  } catch(err) {
   console.log(err)
  }
}

export async function updatePost(data, id, token) {
   try {
      const option = {
         'method': 'PATCH',
         'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify(data)
      }
   
      const responseJSON = await fetch(`${baseURL}posts/${id}`, option)
   
      const response = await responseJSON.json()
   
      return response

   } catch(err) {
      console.log(err)
   }
}

export async function deletePost(postID, token) {
   try {
      const option = {
         'method': 'DELETE',
         'headers': {
            'Authorization': `Bearer ${token}`
         }
      }
      const responseJSON = await fetch(`${baseURL}posts/${postID}`, option)
   
      const response = await responseJSON.json()
   
      return response
      
   } catch(err) {
      console.log(err)
   }
}