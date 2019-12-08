
const Interdate  = (_a, _b) =>{
    a = new Date(_a)
    b = new Date(_b)
    return Math.abs(b.getTime() - a.getTime()) / (1000 * 3600 * 24)
}

const INTERESTS = [
    -0.05,
    -0.045,
    -0.04,
    -0.035,
    -0.03,
    -0.025,
    -0.02,
    -0.015,
    -0.01,
    -0.005,
    0,
    0.005,
    0.01,
    0.015,
    0.02,
    0.025,
    0.03,
    0.035,
    0.04,
    0.045,
    0.05,
]

const Arraysum = a => a.reduce((p, c) => p + c, 0)

const ExponentialDistribution = (lambda, x) => {
    if (x <= 0) { return 0; }
    return -Math.expm1(-lambda * x)
}

module.exports = {
    Interdate,
    Arraysum,
    ExponentialDistribution,
    INTERESTS,
}