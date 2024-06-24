# https://github.com/chidakiyo/vegeta?tab=readme-ov-file#http-format
#
# target.config should be like shown below
#
# GET https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/test/mock_test

vegeta attack \
    -targets target.config \
    -rate=1000 \
    -duration=30s |
    tee results.bin | vegeta report
