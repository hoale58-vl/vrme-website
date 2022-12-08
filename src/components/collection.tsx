import { navigate } from 'gatsby'
import React from 'react'
import CollectionSkeleton from '../components/collection-skeleton'

interface CollectionProps {
  name: string
  avatar: string
  author: string
  images: string[]
  onSetTab: (tab: number) => void
}

const Collection: React.FC<CollectionProps> = ({ name, avatar, author, images, onSetTab }) => {
  const handleNFT = () => {
    navigate('/marketplace/?tab=1').then(() => {
      onSetTab(1)
    })
  }

  return (
        <>
            {images[0] ? (
                <div className="collection">
                    <div className="collection-main-image">
                        <img className="collection-image glightbox" src={images[0]} alt="" />
                    </div>
                    <div className="collection-small-image-group">
                        <div className="collection-small-image">
                            <img className="collection-image glightbox" src={images[1]} alt="" />
                        </div>
                        <div className="collection-small-image">
                            <img className="collection-image glightbox" src={images[2]} alt="" />
                        </div>
                        <div
                            className="collection-image collection-small-image collection-small-image-count hover:cursor-pointer"
                            onClick={handleNFT}
                        >
                            1025+
                        </div>
                    </div>
                    <div className="collection-name">{name}</div>
                    <div className="collection-author-group">
                        <img className="w-6 h-6" src={avatar} alt="" />
                        <div className="collection-author-name h-full">{author}</div>
                    </div>
                </div>
            ) : (
                <CollectionSkeleton />
            )}
        </>
  )
}

export default Collection
