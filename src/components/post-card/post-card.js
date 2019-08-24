import React, { useRef } from "react"
import { Link } from "gatsby"
import cardStyles from "./post-card.module.scss"
import Image from "gatsby-image"
import { stopPropCallback } from "../../utils/preventCallback"
import TransitionLink from "gatsby-plugin-transition-link"

export const PostCard = ({ title, author, published, tags, excerpt, description, className, slug }) => {
  const headerLink = useRef()
  const authorLink = useRef()
  return (
    <div className={`${cardStyles.card} ${className}`} onClick={() => headerLink.current.click()}>
      <div className={cardStyles.cardContents}>
        <TransitionLink
          to={`/posts${slug}`}
          onClick={stopPropCallback}
          className="unlink"
          entry={{
            state: { isEntryPage: true }
          }}
          exit={{
            state: { isEntryPage: false },
            length: .6
          }}
        >
          <h2 className={cardStyles.header} ref={headerLink}
          >{title}</h2>
        </TransitionLink>
        <p className={cardStyles.authorName}
           onClick={(e) => {
             stopPropCallback(e)
             authorLink.current.click()
           }}
        >
          by&nbsp;{author.name}
        </p>
        <div className={cardStyles.dateTagSubheader}>
          <p className={cardStyles.date}>{published}</p>
          <div>
            {
              tags.map(tag => (
                <span
                  key={tag}
                  className={cardStyles.tag}
                >
                  {tag}
                </span>
              ))
            }
          </div>
        </div>
        <p className={cardStyles.excerpt} dangerouslySetInnerHTML={{
          __html: description || excerpt,
        }}
        />
      </div>
      <Link
        to={`/unicorns/${author.id}`}
        ref={authorLink}
        onClick={stopPropCallback}
        className={cardStyles.profilePicLink}
        style={{
          borderColor: author.color,
        }}
      >
        <Image
          fixed={author.profileImg.childImageSharp.smallPic}
          alt={author.name}
          className={cardStyles.profilePic}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      </Link>
    </div>
  )
}

