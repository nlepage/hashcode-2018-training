const { readFileSync } = require('fs')

const buffer = readFileSync('./small.in').toString()
const [numbers, ...pizza] = buffer.split('\n')
const [R, C, L, H] = numbers.split(' ')

const cursor = [0, 0]
const slices = []

const matrix = pizza.map(line => line.split(''))

if (isSliceValid(0, 0, 2, L)) {
  slices.push([0, 0, 2, L])
}

if (L != 2 && isSliceValid(0, 0, L, 2)) {
  slices.push([0, 0, L, 2])
}

function isSliceValid(r1, c1, r2, c2) {
  const ingredients = [0, 0]
  for(let r = r1; r <= r2; r++)
    for(let c = c1; r <= c2; c++) {
      if (matrix[r][c] === 'M') {
        ingredients[0]++
      } else {
        ingredients[1]++
      }
    }

  return ingredients[0] >= L && ingredients[1] >= L
}
