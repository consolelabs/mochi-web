import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      permanent: false,
      destination: `/dashboard/${ctx.query.server_id}/quests/recurrence`,
    },
  }
}

const Quests = () => {
  return null
}

export default Quests
