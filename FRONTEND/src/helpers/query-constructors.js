export const getQueryGetProducts = ({ limit, offset, orderBy, search, from }) => (
  `query {
    getProducts(
      limit: ${limit},
      offset: ${offset},
      ${orderBy && orderBy !== '' ? `orderBy: "${orderBy}",` : ''}
      ${search && search !== '' ? `search: "${search}",` : ''}
      ${from && from !== '' ? `from: "${from}",` : ''}
    ) {
      products {
        id,
        name,
        price,
        image
      }
      hasNextPage
    }
  }`
)

export const getQueryLoggedUser = () => (
  `query {
    getLoggedUser {
      id,
      email,
      age
    }
  }`
)

export const getQueryLogin = ({ email, password }) => (
  `mutation {
    logIn(email: "${email}", password: "${password}")
  }`
)

export const getQuerySignin = ({ email, password, age }) => (
  `mutation {
    signIn(email: "${email}", password: "${password}", age: ${age}) {
      id,
      email
    }
  }`
)

export const getQueryChangePassword = ({ oldPassword, newPassword }) => (
  `mutation {
    changePassword(lastPassword: "${oldPassword}", newPassword: "${newPassword}") {
      id,
      email
    }
  }`
)

export const getQueryEditProfile = ({ email, age }) => (
  `mutation {
    editClient(email: "${email}", age: ${age}) {
      id,
      age,
      email
    }
  }`
)

export const getQueryCreateWishList = ({ name, priv }) => (
  `mutation {
    createWishList(
      name: "${name}",
      priv: ${priv}
    ) {
      id,
      name
    }
  }`
)

export const getQueryGetWishListsByUser = () => (
  `query {
    getWishListsByUser {
      id,
      name,
      priv
    }
  }`
)

export const getQueryAddProductToWishList = ({
  product: {
    id,
    name,
    price,
    amount,
    image
  },
  idWishList
}) => {
  return (
    `mutation {
      addProductToWishList(
        product: {
          id: "${id}",
          name: "${name}",
          price: ${price}
          amount: 1,
          image: "${image}"
        },
        idWishList: ${idWishList}
      ) {
        id,
        name,
        price
      }
    }`
  )
}

export const getQueryGetWishListById = ({ id }) => (
  `query {
    getWishListById(id: ${id}) {
      id,
      name,
      priv,
      products {
        id,
        name,
        price
      }
    }
  }`
)

export const getQueryDeleteProductToWishList = ({ id }) => (
  `mutation {
    deleteProductToWishList(id: ${id}) {
      id,
      response
    }
  }`
)

export const getQueryEditWishList = ({ id, name, priv }) => (
  `mutation {
    editWishList(
      name: "${name}",
      priv: ${priv},
      id: ${id}
    ) {
      id,
      name,
      priv
    }
  }`
)