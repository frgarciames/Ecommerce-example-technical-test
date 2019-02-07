import React, { Component, Fragment } from 'react';
import { graphqlRequestWithNoToken, graphqlRequestWithToken } from '../services/graphql.service.';
import ProductCard from '../components/product-card';
import { getQueryGetProducts, getQueryGetWishListsByUser, getQueryAddProductToWishList } from '../helpers/query-constructors';
import '../styles/views/_home.scss'
import { withContext } from '../utils/withContext';
import { Searcher } from '../components/searcher';

class Home extends Component {
  constructor() {
    super();
    this.timeout = null;
  }

  state = {
    products: [],
    limit: 30,
    offset: 0,
    orderBy: '',
    search: '',
    from: [],
    hasNextPage: true,
    pollingForData: false,
    addingToWishList: {
      state: false,
      product: null
    },
    filterOpen: false
  }

  componentDidMount() {
    const { limit, offset, orderBy } = this.state;
    this.handleOnSearch({ limit, offset, orderBy, search: null });
    this.addEventScroll();
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.addingToWishList.state && this.state.addingToWishList.state && !this.state.wishLists) {
      const data = await graphqlRequestWithToken({
        query: getQueryGetWishListsByUser()
      });

      this.setState({
        wishLists: data.getWishListsByUser
      })
    }
  }

  // Infinite scroll
  onScroll = () => {
    if (this.state.hasNextPage) {
      const distToBottom = this.getDistFromBottom();
      if (!this.state.pollingForData && distToBottom > 0 && distToBottom <= 200) {
        const newLimit = this.state.limit + 10;
        this.setState({
          limit: newLimit,
          offset: 0,
          orderBy: this.state.orderBy,
          search: this.state.search,
          pollingForData: true
        })

        this.handleOnSearch(this.state);
      }
    }
  }

  addEventScroll = () => {
    document.addEventListener('scroll', this.onScroll);
  }

  getDistFromBottom = () => {
    const scrollPosition = window.pageYOffset;
    const windowSize = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;
    return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
  }


  handleOnSearch = async ({ limit, offset, orderBy, search, from }) => {
    const data = await graphqlRequestWithNoToken({
      query: getQueryGetProducts({
        limit,
        offset,
        orderBy,
        search,
        from
      })
    });
    const { products, hasNextPage } = data.getProducts;
    this.setState({
      products,
      pollingForData: false,
      hasNextPage
    })
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (name === 'from') {
      const isChecked = e.target.checked;
      let from = [];
      if (isChecked && this.state.from.length >= 0) {
        from = [...this.state.from, value];
      } else if (!isChecked && this.state.from.length > 1) {
        from = [...this.state.from].splice(this.state.from.indexOf(value) - 1, 1);
      } else if (!isChecked && this.state.from.length === 1) {
        from = []
      }
      this.setState({
        from
      })
    } else {
      this.setState({
        [name]: value
      })
    }
    this.timeout = setTimeout(() => {
      const { orderBy, search, from } = this.state;
      this.handleOnSearch({
        limit: 10,
        offset: 0,
        orderBy,
        search,
        from: from.length > 1 ? '' : from[0]
      });

    }, 700);
  }

  handleOnClick = (id) => {
    this.props.history.push(`/product/${id}`);
  }

  render() {
    return (
      <Fragment>
        <div className='search__container'>
          <span
            className='search__title'
            onClick={() => this.setState({ filterOpen: !this.state.filterOpen })}>
            Filter by
            <span className={`arrow ${this.state.filterOpen ? 'arrow--open' : ''}`}>&gt;</span>
          </span>
          {this.state.filterOpen && (
            <Searcher handleOnChange={this.handleOnChange} />
          )}
        </div>
        <div className="home-container">
          {
            this.state.products && this.state.products.map(prod => {
              return (
                <ProductCard
                  product={prod}
                  key={prod.id}
                  user={this.props.context.state.user}
                  onClickNavigation={() => this.handleOnClick(prod.id)}
                  addToCart={this.props.context.addProductToCart}
                  addToWishList={(product) => {
                    document.body.style.overflow = 'hidden';
                    this.setState({
                      addingToWishList: {
                        state: true,
                        product
                      }
                    })
                  }}
                />
              )
            })
          }
        </div>
        {this.state.addingToWishList.state && (
          <div style={{
            position: 'fixed',
            width: '50vw',
            height: '50vh',
            backgroundColor: 'white',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid grey'
          }}>
            <p>Wich Wish List do you want to add this product ?</p>
            <form>
              {this.state.wishLists && (
                this.state.wishLists.map(wl => (
                  <Fragment key={wl.id}>
                    <p onClick={async () => {
                      const data = await graphqlRequestWithToken({
                        query: getQueryAddProductToWishList({
                          product: this.state.addingToWishList.product,
                          idWishList: wl.id
                        })
                      });
                      document.body.style.overflow = 'auto';
                      this.setState({
                        addingToWishList: {
                          state: false,
                          product: null
                        }
                      })
                    }}>
                      <span>{wl.name}</span>
                      <span>{wl.priv ? 'Private' : 'Public'}</span>
                    </p>
                  </Fragment>
                ))
              )}
            </form>
            <button onClick={() => {
              document.body.style.overflow = 'auto';
              this.setState({
                addingToWishList: {
                  state: false,
                  product: null
                }
              })
            }}>
              Cancel
          </button>
          </div>
        )}
      </Fragment>
    )
  }

}

export default withContext(Home);