import { checkData } from './app'

test('If data is correct', () => {
  let data = {
    'imgUrl': 'https://video.udacity-data.com/topher/2019/August/5d44825f_travel-app-project-mockup/travel-app-project-mockup.png',
    'destination': Pune + ', ' + India,
    'date': '12/10/2020',
    'weather': {
      'high': 20,
      'low': 10,
      'summary': 'cool weather'
    }
  }
  expect(checkData(data)).toBeTruthy()
})