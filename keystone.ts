
import { config } from '@keystone-6/core'
import { withAuth, session } from './auth'
import { User } from './schemas/user'
import { Podcast } from './schemas/podcast';
import { Artist } from './schemas/artist';
import { extendGraphqlSchemas } from './schemas/extend';

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: 'sqlite',
      url: 'file:./db.sqlite',
    },
    lists : {User,Podcast,Artist},
    session,
    ui : {
      isAccessAllowed : ({session}) => {
        return !!session?.data?.isAdmin;
      }
    },
    graphql : {
      extendGraphqlSchema : extendGraphqlSchemas,
    }
  })
)
