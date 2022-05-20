import './style/loader.css'

export const Loader = () => {
	return (
		<>
			<div className="content-loading">
        <div className='content-text-loading'>
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          <p className='text-center display-4 mt-4 loading-text' style={{ color: 'white' }}>
            Cargando...
          </p>
        </div>
      </div>
		</>
	)
};