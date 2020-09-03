import { EmptyState, Layout, Page, Stack, TextStyle, Thumbnail, MediaCard } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Product extends React.Component {
  	state = { 
  		discount: '',
	    price: '',
	    title: '',
	    variantId: '',
	    showToast: false, 
	};

	componentDidMount() {
    	this.setState({ discount: this.itemToBeConsumed() });
  	}

  	render() {
  		const { name, price, discount, variantId, title, originalSrc, altText, description } = this.state;
    	
    	return (
		  	<Page>
		  		<TitleBar
		      		title="Sample App"
		      		primaryAction={{
		        		content: 'Select products',
		        		onAction: () => this.setState({ open: true }),
		      		}}
		    	/>
			    <ResourcePicker
		          resourceType="Product"
		          showVariants={false}
		          open={this.state.open}
		          onSelection={(resources) => this.handleSelection(resources)}
		          onCancel={() => this.setState({ open: false })}
		        />

		        <MediaCard
					title={title}
					primaryAction={{
						content: 'Select products',
					    onAction: () => this.setState({ open: true }),
					}}
					description={description}
				>
					<img
						alt=""
						width="100%"
					    height="100%"
					    style={{
					      	objectFit: 'cover',
					      	objectPosition: 'center',
					    }}
					    src={originalSrc}
					/>
				</MediaCard>
		  	</Page>
		);
    }

    handleChange = (field) => {
	    return (value) => this.setState({ [field]: value });
	};

	  itemToBeConsumed = () => {
	    const item = store.get('item');
	    const title = item.title + ' $' + item.variants.edges[0].node.price;
	    const price = item.variants.edges[0].node.price;
	    const originalSrc = item.images.edges[0].node.originalSrc;
	    const altText = item.images.edges[0].node.altText;
	    const description = item.descriptionHtml;
	    const variantId = item.variants.edges[0].node.id;
	    const discounter = price * 0.1;
	    this.setState({ price, variantId, title, originalSrc, altText, description });
	    return (price - discounter).toFixed(2);
	  };
}

export default Product;