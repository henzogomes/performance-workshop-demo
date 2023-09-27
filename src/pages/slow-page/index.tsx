import { GetServerSidePropsContext } from 'next/types'
import { useEffect, useState } from 'react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context

  // Access specific parameters
  let { wait } = query

  if (!wait) {
    wait = '2000'
  }

  return {
    props: {
      wait
    }
  }
}

export default function SlowPage({ wait }: { wait: string }) {
  const [info, setInfo] = useState<string>('')

  useEffect(() => {
    function lockMainThread(time: number) {
      let milliseconds = 0

      console.log(`Wait time: ${time}`)

      if (time) {
        milliseconds = time * 1000
      }

      const start = Date.now()
      while (Date.now() - start < milliseconds) {
        console.count('doing stuff')
      }

      return `The page finished loading after ${
        milliseconds / 1000
      } seconds, and it's now interactive!`
    }

    setInfo(lockMainThread(parseInt(wait)))
  }, [wait])

  return (
    <div className="slowPage">
      <h1>This page is slow because it loads a lot o javascript</h1>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, autem.
        Quaerat, unde. Totam, quas. Quos, quia? Nisi, quia. Quibusdam, quas.
        Consequuntur, eos. Quia, quas? Quisquam, similique. Doloremque,
        doloribus. Qui, quos.
      </div>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, autem.
        Quaerat, unde. Totam, quas. Quos, quia? Nisi, quia. Quibusdam, quas.
        Consequuntur, eos. Quia, quas? Quisquam, similique. Doloremque,
        doloribus. Qui, quos.
      </div>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, autem.
        Quaerat, unde. Totam, quas. Quos, quia? Nisi, quia. Quibusdam, quas.
        Consequuntur, eos. Quia, quas? Quisquam, similique. Doloremque,
        doloribus. Qui, quos.
      </div>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, autem.
        Quaerat, unde. Totam, quas. Quos, quia? Nisi, quia. Quibusdam, quas.
        Consequuntur, eos. Quia, quas? Quisquam, similique. Doloremque,
        doloribus. Qui, quos.
      </div>

      <input
        type="text"
        name=""
        id=""
        placeholder="input"
        onKeyUp={(e: any) => console.log(e.target.value)}
      />

      <input
        type="button"
        value="Click me"
        onClick={() => console.log('click')}
      />

      <h2 id="info">{info}</h2>
    </div>
  )
}
