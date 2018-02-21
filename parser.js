const { readFileSync } = require('fs')

const buffer = readFileSync('./' + process.argv[2] + '.in').toString()
const [numbers, ...pizza] = buffer.split('\n')
const [R, C, L, H] = numbers.split(' ').map(x => parseInt(x))

const cursor = [0, 0]
const slices = []
const matrix = pizza.map(line => line.split(''))

for(let r = 0; r < R; r+=2)
  for(let c = 0; c <= C - L ; c+=L+1) {
    if (isSliceValid(r, c, r + 1, c + L - 1)) {
      slices.push([r, c, r + 1, c + L - 1])
    }
  }


console.log(slices.length)

slices.forEach(slice => {
  console.log(slice.join(' '))
})

generatorSlice(L, H)

function isSliceValid(r1, c1, r2, c2) {
  const ingredients = [0, 0]
  for (let r = r1; r <= r2; r++)
    for (let c = c1; c <= c2; c++) {
      if (matrix[r][c] === 'M') {
        ingredients[0]++
      } else {
        ingredients[1]++
      }
    }

  return ingredients[0] >= L && ingredients[1] >= L
}

function generatorSlice(L, H) {
  let result = []
  for (let row = 1; row <= H; row++) {
    for (let col = 1; col <= H; col++) {
      if (row * col <= H && row * col >= 2 * L) result.push([row, col])
    }
  }
}
