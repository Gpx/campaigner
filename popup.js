const urlInput = document.getElementById('url')
const sourceInput = document.getElementById('source')
const mediumInput = document.getElementById('medium')
const campaignInput = document.getElementById('campaign')
const outputInput = document.getElementById('output')

const inputs = {
  url: null,
  source: null,
  medium: null,
  campaign: null,
}

const handleInputChange= ({ currentTarget }) => {
  const { id, value } = currentTarget
  inputs[id] = value
  const utmUrl = calculateUTMUrl()
  output.value = utmUrl
}

const calculateUTMUrl = () => {
  const { url, source, medium, campaign } = inputs
  if (!url) return ''
  const parsedUrl = parseUrl(url)
  const { search } = parsedUrl
  const searchParameters = search === ''
    ? []
    : search.slice(1).split('&')
  if (source) searchParameters.push(`utm_source=${encodeURIComponent(source)}`)
  if (medium) searchParameters.push(`utm_medium=${encodeURIComponent(medium)}`)
  if (campaign) searchParameters.push(`utm_campaign=${encodeURIComponent(campaign)}`)
  parsedUrl.search = '?' + searchParameters.join('&')
  return parsedUrl.href
}

const parseUrl = url => {
  const parser = document.createElement('a')
  parser.href = url
  return parser
}

urlInput.addEventListener('change', handleInputChange)
sourceInput.addEventListener('change', handleInputChange)
mediumInput.addEventListener('change', handleInputChange)
campaignInput.addEventListener('change', handleInputChange)
