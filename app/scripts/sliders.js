const desktop = 1024

if (screen.width < desktop) {
  const $cases = document.querySelector('#cases .glider')
  const $customers = document.querySelector('#customers .glider')
  const $openSource = document.querySelector('#open-source .glider')
  const $technologies = document.querySelector('#technologies .glider')

  const defaultConf = {
    slidesToScroll: 1,
    slidesToShow: 1.1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 2.1,
        },
      },
    ],
  }

  function getConfig(partial = {}) {
    return Object.assign({}, defaultConf, partial)
  }

  new Glider(
    $technologies,
    getConfig({
      slidesToShow: 1.4,
      dots: '#technologies .dots',
    })
  )

  new Glider(
    $openSource,
    getConfig({
      dots: '#open-source .dots',
    })
  )

  new Glider(
    $cases,
    getConfig({
      dots: '#cases .dots',
    })
  )

  new Glider(
    $customers,
    getConfig({
      slidesToShow: 1,
      dots: '#customers .dots',
    })
  )
}
