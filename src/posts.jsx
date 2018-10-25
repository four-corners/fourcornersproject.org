import React from "react";
import { Link } from "react-router-dom";
import PostList from "./post-list";

class Posts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			page: 0,
			getPosts: true,
			controller: false
		};
		this.getMorePosts = this.getMorePosts.bind(this);
	}

	componentWillUnmount() {
		this.getMorePosts = null;
	}

	componentDidMount() {
		var that = this;
		window.onbeforeunload = function() {
			window.scrollTo(0, 0);
		};
	}

	getMorePosts() {
		var that = this;
		var totalPages;

		this.setState({ page: this.state.page + 1 });

		fetch(SiteSettings.URL.api + "posts/?page=" + this.state.page)
			.then(function(response) {
				for (var pair of response.headers.entries()) {
					// getting the total number of pages
					if (pair[0] == "x-wp-totalpages") {
						totalPages = pair[1];
					}

					if (that.state.page >= totalPages) {
						that.setState({ getPosts: false });
					}
				}
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(results) {
				var allPosts = that.state.posts.slice();
				results.forEach(function(single) {
					allPosts.push(single);
				});
				that.setState({ posts: allPosts });
			})
			.catch(function(error) {
				console.log(
					"There has been a problem with your fetch operation: " + error.message
				);
			});
	}

	componentDidUpdate() {
		
	}

	render() {
		if (!this.state.posts.length === 0) {
			return <h1>LOADING</h1>;
		}
		return (
			<div>
				<div className="container">
					<h1 className="posts-title">Posts</h1>
					<PostList posts={this.state.posts} />
				</div>
			</div>
		);
	}
}

export default Posts;