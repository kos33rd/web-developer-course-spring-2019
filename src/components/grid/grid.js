import React from 'react'

import styles from './grid.css'
import classnames from 'classnames'

export const Grid = ({ direction, container, item, lg, sm, children }) => {
    if(container) {

        const directionCls = styles[direction]

        return (
            <div className={classnames(
                styles.container,
                directionCls
            )}>
                {children}
            </div>
        )
    }

    const itemLgWidthStyle = styles[`item-lg-${lg}`]
    const itemSmWidthStyle = styles[`item-sm-${sm}`]


    return (
        <div className={classnames(
            styles.item,
            itemLgWidthStyle,
            itemSmWidthStyle
        )}>
            {children}
        </div>
    )
}


Grid.defaultProps = {
    direction: 'row'
}
