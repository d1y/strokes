import axios from 'axios'
import ghCDN from 'github-to-cdn'

export const getWords = async ()=> {
  const fetchLink = ghCDN(`https://raw.githubusercontent.com/jjcheer/ocrcn_tf2/master/dataset/characters.txt`)
  try {
    const res = await axios.get(fetchLink)
    const { data } = res
    let result = data.split('\n')
    const str = JSON.stringify(result)
    localStorage.setItem('data', str)
    return result
  } catch (error) {
    
  }
}