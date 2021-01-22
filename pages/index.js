import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto">
      <header className="bg-green-200 h-12">
        Navigation bar
      </header>
      <main className="flex flex-grow bg-red-200">
        <div className="flex flex-col w-full">
          <div className="h-1/5">
            Titulo
          </div>
          <div className="w-full flex items-center justify-center h-3/4 bg-blue-600">
            <div className="bg-white w-80 h-80">
              foto
            </div>
          </div>
          <div className="h-1/5">
            Backs
          </div>
        </div>
      </main>
      <footer className="bg-blue-200 h-12">
        Social links
      </footer>
    </div>
  )
}
