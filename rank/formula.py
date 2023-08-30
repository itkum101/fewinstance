import math


def getPerString(rank, cutoff, total_seats):
    # print ("initial rank:",rank)
    # if rank<40:
    #     rank=1
    # else:
    #     rank=rank-39
    # print("after edit:",rank)
    z = (rank - cutoff) / total_seats
    
    probability = 1 / (1 + math.exp(z))
    probability_percentage = probability * 100
    
    prob = str(probability_percentage)

    return prob