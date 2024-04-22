// @ts-nocheck
import { Link } from 'react-router-dom';
import { Myimage } from '../components/Myimage';
import { useInView } from 'react-intersection-observer'

const Post = ({props}) => {
  const {post} = props;

  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  return (
    <div ref={ref} id='post' className='post' key={post.id}>
    <div className="img">
    {inView ?
    <Link className='link' to={`/post/${post.id}`}>
      <Myimage src={post?.md} placeholderSrc={post?.sm} width='396.6' height='400' />
    </Link>
    :
    <Link className='link' to={`/post/${post.id}`}>
      <Myimage src={post?.sm} placeholderSrc={post?.sm} width='396.6' height='400' />
    </Link>
    }
    </div>
    <div className="content">
      <Link className='link' to={`/post/${post.id}`}>
      <h1 id='home-title'>{post.title}</h1>
      </Link>
        {`${post.desc}`.length > 100 ? <div
        style={{flexGrow: '1'}}
        id='home-desc'
        dangerouslySetInnerHTML={{__html: (`${post.desc}`.substring(0, 500) + `...`)}}
        >
        </div>
        :
        <div
        style={{flexGrow: '1'}}
        id='home-desc'
        dangerouslySetInnerHTML={{__html: (`${post.desc}`.substring(0, 500))}}
        >
        </div>}
      <Link className='link' to={`/post/${post.id}`}>
      <button>Read more</button>
      </Link>
    </div>
  </div>
  )
}

export default Post
