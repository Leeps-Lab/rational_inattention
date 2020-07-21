import csv
import random
import math
from otree.api import (
    models,
    widgets,
    BaseConstants,
    BaseSubsession,
    BaseGroup,
    BasePlayer,
    Currency as c,
    currency_range,
)
from otree_redwood.models import DecisionGroup

author = 'Your name here'

doc = """
Your app description
"""


class Constants(BaseConstants):
    name_in_url = 'rational_inattention'
    players_per_group = None
    g = []
    m = []
    y = []
    q = []

# Couldn't figure out how to retrieve current round number into subsession
    temporary_round_number = 0

#reads straight from the config file constants
    with open('rational_inattention/configs/config_file.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            num_rounds = int(row['num_rounds'])
            endowment = int(row['endowment'])
            initial_bonds = int(row['initial_bonds'])
            buy_option = True if row['buy_option'] == 'True' else False
            sell_option = True if row['sell_option'] == 'True' else False
            randomize_data = True if row['randomize_data'] == 'True' else False
# script to create a csv document with uniformly generated values for each variable
    if(randomize_data):
        with open('rational_inattention/configs/data.csv', 'w', newline='') as csvfile:
            fieldnames = ['num_rounds', 'g' , 'm', 'y', 'q']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for i in range(1 , num_rounds + 1):
                    writer.writerow(dict([
                    ('num_rounds',i),
                    ('g', int(random.uniform(0, 100))),
                    ('m', int(random.uniform(0, 100))),
                    ('y', int(random.uniform(0, 100))),
                    ('q', int(random.uniform(0, 100))),
                    ]))
# reads from data.csv into lists
    with open('rational_inattention/data.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            g.append(
                int(row['g'])
            )
            m.append(
                int(row['m'])
            )
            y.append(
                int(row['y'])
            )
            q.append(
                int(row['q'])
            )
    def get_round_number(self):
        return self.round_number

class Subsession(BaseSubsession):
    # initial values of fields for players for each subsession

    g = models.IntegerField(initial = Constants.g[ Constants.temporary_round_number ])
    m = models.IntegerField(initial = Constants.m[ Constants.temporary_round_number ])
    y = models.IntegerField(initial = Constants.y[ Constants.temporary_round_number ])
    q = models.IntegerField(initial = Constants.q[ Constants.temporary_round_number ])
    finish = models.BooleanField(initial=False)


class Group(DecisionGroup):
    pass


class Player(BasePlayer):
    # amount of money player starts with
    spend = models.FloatField(
        min=0,
        max=Constants.endowment
    )
