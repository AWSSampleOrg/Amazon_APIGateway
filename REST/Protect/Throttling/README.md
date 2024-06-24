# Do usage plan based on token bucket algorithm

Prepare `target.config` file.
stress.sh

## Plan

| RPS   | Burst | Rate  |
| ----- | ----- | ----- |
| 1,000 | 900   | 800   |
| 1,000 | 900   | 900   |
| 1,000 | 900   | 950   |
| 1,000 | 900   | 1,000 |
| 1,000 | 900   | 1,050 |
| 1,000 | 1,000 | 900   |
| 1,000 | 1,000 | 1,000 |
| 1,000 | 1,000 | 1,100 |
| 1,000 | 1,100 | 900   |
| 1,000 | 1,100 | 1,000 |
| 1,000 | 1,100 | 1,100 |

## Burst size is 900

| RPS   | Burst | Rate  |
| ----- | ----- | ----- |
| 1,000 | 900   | 800   |
| 1,000 | 900   | 900   |
| 1,000 | 900   | 950   |
| 1,000 | 900   | 1,000 |
| 1,000 | 900   | 1,050 |

### | 1,000 | 900 | 800 |

```sh
Requests      [total, rate, throughput]         30000, 1000.03, 594.21
Duration      [total, attack, wait]             30.037s, 29.999s, 37.47ms
Latencies     [min, mean, 50, 90, 95, 99, max]  27.068ms, 36.285ms, 33.596ms, 42.176ms, 48.703ms, 81.957ms, 247.558ms
Bytes In      [total, mean]                     1501136, 50.04
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           59.49%
Status Codes  [code:count]                      200:17848  429:12152
Error Set:
429 Too Many Requests
```

### | 1,000 | 900 | 900 |

```sh
Requests      [total, rate, throughput]         30000, 1000.03, 879.18
Duration      [total, attack, wait]             30.032s, 29.999s, 33.495ms
Latencies     [min, mean, 50, 90, 95, 99, max]  26.761ms, 36.04ms, 32.916ms, 38.169ms, 47.084ms, 121.968ms, 274.036ms
Bytes In      [total, mean]                     1774928, 59.16
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           88.01%
Status Codes  [code:count]                      200:26404  429:3596
Error Set:
429 Too Many Requests
```

### | 1,000 | 900 | 950 |

```sh
Requests      [total, rate, throughput]         30000, 1000.03, 961.83
Duration      [total, attack, wait]             30.118s, 29.999s, 118.697ms
Latencies     [min, mean, 50, 90, 95, 99, max]  27.336ms, 59.753ms, 40.369ms, 114.374ms, 122.579ms, 154.112ms, 268.146ms
Bytes In      [total, mean]                     1856976, 61.90
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           96.56%
Status Codes  [code:count]                      200:28968  429:1032
Error Set:
429 Too Many Requests
```

### | 1,000 | 900 | 1,000 |

```sh
Requests      [total, rate, throughput]         29995, 999.82, 980.72
Duration      [total, attack, wait]             30.032s, 30.001s, 31.416ms
Latencies     [min, mean, 50, 90, 95, 99, max]  27.528ms, 34.541ms, 32.789ms, 37.001ms, 40.368ms, 75.254ms, 239.3ms
Bytes In      [total, mean]                     1872341, 62.42
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           98.19%
Status Codes  [code:count]                      200:29453  429:542
Error Set:
429 Too Many Requests
```

### | 1,000 | 900 | 1,050 |

```sh
Requests      [total, rate, throughput]         30000, 1000.03, 998.82
Duration      [total, attack, wait]             30.035s, 29.999s, 36.352ms
Latencies     [min, mean, 50, 90, 95, 99, max]  27.342ms, 35.895ms, 33.597ms, 40.565ms, 45.856ms, 78.007ms, 261.966ms
Bytes In      [total, mean]                     1890000, 63.00
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:30000
Error Set:
```

## Burst size is 1,000

| RPS   | Burst | Rate  |
| ----- | ----- | ----- |
| 1,000 | 1,000 | 900   |
| 1,000 | 1,000 | 1,000 |
| 1,000 | 1,000 | 1,100 |

### | 1,000 | 1,000 | 900 |

```sh
Requests      [total, rate, throughput]         30000, 1000.03, 933.83
Duration      [total, attack, wait]             30.049s, 29.999s, 50.348ms
Latencies     [min, mean, 50, 90, 95, 99, max]  26.985ms, 35.002ms, 32.937ms, 37.957ms, 42.891ms, 81.552ms, 233.34ms
Bytes In      [total, mean]                     1827952, 60.93
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           93.54%
Status Codes  [code:count]                      200:28061  429:1939
Error Set:
429 Too Many Requests
```

### | 1,000 | 1,000 | 1,000 |

```sh
Requests      [total, rate, throughput]         30000, 1000.03, 954.15
Duration      [total, attack, wait]             30.031s, 29.999s, 31.93ms
Latencies     [min, mean, 50, 90, 95, 99, max]  26.935ms, 36.989ms, 33.331ms, 40.8ms, 52.647ms, 126.841ms, 270.306ms
Bytes In      [total, mean]                     1846928, 61.56
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           95.51%
Status Codes  [code:count]                      200:28654  429:1346
Error Set:
429 Too Many Requests
```

### | 1,000 | 1,000 | 1,100 |

```sh
Requests      [total, rate, throughput]         30000, 1000.03, 998.97
Duration      [total, attack, wait]             30.031s, 29.999s, 31.785ms
Latencies     [min, mean, 50, 90, 95, 99, max]  27.14ms, 34.934ms, 33.096ms, 38.313ms, 43.039ms, 77.945ms, 246.861ms
Bytes In      [total, mean]                     1890000, 63.00
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:30000
Error Set:
```

## Burst size is 1,100

| RPS   | Burst | Rate  |
| ----- | ----- | ----- |
| 1,000 | 1,100 | 900   |
| 1,000 | 1,100 | 1,000 |
| 1,000 | 1,100 | 1,100 |

### | 1,000 | 1,100 | 900 |

```sh
Requests      [total, rate, throughput]         30000, 1000.03, 937.32
Duration      [total, attack, wait]             30.038s, 29.999s, 38.671ms
Latencies     [min, mean, 50, 90, 95, 99, max]  27.319ms, 36.439ms, 33.625ms, 40.385ms, 49.16ms, 92.58ms, 261.184ms
Bytes In      [total, mean]                     1830960, 61.03
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           93.85%
Status Codes  [code:count]                      200:28155  429:1845
Error Set:
429 Too Many Requests
```

### | 1,000 | 1,100 | 1,000 |

```sh
Requests      [total, rate, throughput]         30000, 1000.01, 996.43
Duration      [total, attack, wait]             30.108s, 30s, 108.06ms
Latencies     [min, mean, 50, 90, 95, 99, max]  27.318ms, 51.065ms, 33.688ms, 82.604ms, 113.9ms, 399.498ms, 1.254s
Bytes In      [total, mean]                     1890000, 63.00
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:30000
Error Set:
```

### | 1,000 | 1,100 | 1,100 |

```sh
Requests      [total, rate, throughput]         30000, 1000.03, 999.03
Duration      [total, attack, wait]             30.029s, 29.999s, 29.97ms
Latencies     [min, mean, 50, 90, 95, 99, max]  26.922ms, 35.114ms, 32.792ms, 38.003ms, 43.912ms, 82.005ms, 262.241ms
Bytes In      [total, mean]                     1890000, 63.00
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:30000
Error Set:
```
